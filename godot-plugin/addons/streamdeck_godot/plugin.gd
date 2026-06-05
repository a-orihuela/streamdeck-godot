@tool
extends EditorPlugin

const PORT := 9876
const BIND_ADDRESS := "127.0.0.1"

var _server: TCPServer
var _pending_connections: Array[StreamPeerTCP] = []


func _enter_tree() -> void:
	_server = TCPServer.new()
	var err := _server.listen(PORT, BIND_ADDRESS)
	if err != OK:
		push_error("[StreamDeckBridge] Failed to start HTTP server on port %d (error %d)" % [PORT, err])
	else:
		print("[StreamDeckBridge] HTTP server listening on %s:%d" % [BIND_ADDRESS, PORT])


func _exit_tree() -> void:
	for peer in _pending_connections:
		peer.disconnect_from_host()
	_pending_connections.clear()
	if _server:
		_server.stop()
	print("[StreamDeckBridge] HTTP server stopped")


func _process(_delta: float) -> void:
	if not _server or not _server.is_listening():
		return

	while _server.is_connection_available():
		_pending_connections.append(_server.take_connection())

	for i in range(_pending_connections.size() - 1, -1, -1):
		var peer := _pending_connections[i]
		match peer.get_status():
			StreamPeerTCP.STATUS_NONE, StreamPeerTCP.STATUS_ERROR:
				_pending_connections.remove_at(i)
			StreamPeerTCP.STATUS_CONNECTED:
				if peer.get_available_bytes() > 0:
					var raw := peer.get_utf8_string(peer.get_available_bytes())
					_handle_request(peer, raw)
					_pending_connections.remove_at(i)


func _handle_request(peer: StreamPeerTCP, raw: String) -> void:
	var lines := raw.split("\r\n")
	if lines.is_empty():
		_respond(peer, 400, '{"error":"Bad Request"}')
		return

	var parts := lines[0].split(" ")
	if parts.size() < 2:
		_respond(peer, 400, '{"error":"Bad Request"}')
		return

	var path := parts[1]

	match path:
		"/play-current":
			EditorInterface.play_current_scene()
			_respond(peer, 200, '{"status":"OK"}')

		"/play-main":
			EditorInterface.play_main_scene()
			_respond(peer, 200, '{"status":"OK"}')

		"/stop":
			EditorInterface.stop_playing_scene()
			_respond(peer, 200, '{"status":"OK"}')

		"/save":
			EditorInterface.save_scene()
			_respond(peer, 200, '{"status":"OK"}')

		"/save-all":
			EditorInterface.save_all_scenes()
			_respond(peer, 200, '{"status":"OK"}')

		"/reload-scene":
			var scene_root := EditorInterface.get_edited_scene_root()
			if scene_root and not scene_root.scene_file_path.is_empty():
				EditorInterface.reload_scene_from_path(scene_root.scene_file_path)
				_respond(peer, 200, '{"status":"OK"}')
			else:
				_respond(peer, 400, '{"error":"No scene open"}')

		"/open-scene":
			var body := _get_body(raw)
			var data: Variant = JSON.parse_string(body)
			if data is Dictionary and data.has("path"):
				EditorInterface.open_scene_from_path(str(data["path"]))
				_respond(peer, 200, '{"status":"OK"}')
			else:
				_respond(peer, 400, '{"error":"Missing path in request body"}')

		"/status":
			var playing := EditorInterface.is_playing_scene()
			var scene := ""
			if playing:
				scene = EditorInterface.get_playing_scene()
			else:
				var root := EditorInterface.get_edited_scene_root()
				if root:
					scene = root.scene_file_path
			_respond(peer, 200, '{"playing":%s,"scene":"%s"}' % [str(playing).to_lower(), scene])

		_:
			_respond(peer, 404, '{"error":"Not Found"}')


func _get_body(raw: String) -> String:
	var sep := raw.find("\r\n\r\n")
	return raw.substr(sep + 4) if sep >= 0 else ""


func _respond(peer: StreamPeerTCP, status: int, body: String) -> void:
	var status_text: String
	match status:
		200: status_text = "OK"
		400: status_text = "Bad Request"
		_:   status_text = "Not Found"

	var response := (
		"HTTP/1.1 %d %s\r\n"
		+ "Content-Type: application/json\r\n"
		+ "Content-Length: %d\r\n"
		+ "Access-Control-Allow-Origin: *\r\n"
		+ "Connection: close\r\n"
		+ "\r\n"
		+ "%s"
	) % [status, status_text, body.length(), body]

	peer.put_data(response.to_utf8_buffer())
	peer.disconnect_from_host()
