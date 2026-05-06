import io, { Socket } from "socket.io-client";
import { toast } from "sonner";

let socketConnection: Socket | null;

if (typeof window !== "undefined") {
	socketConnection = io(process.env.NEXT_PUBLIC_API_URL, {
		withCredentials: true,
		transports: ["websocket", "polling"],
		reconnection: true,
		autoConnect: true,
	});

	socketConnection.on("connect", () => {
		console.log("Connected to socket");
	});
	socketConnection.on("disconnect", () => {
		toast.error("Disconnected from socket");
	});
} else {
	socketConnection = null;
}

export const socket = socketConnection;
