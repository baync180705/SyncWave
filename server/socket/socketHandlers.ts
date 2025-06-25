const socketHandlers = (socket: any) => {
    socket.on("disconnect", () => {
        console.log(`${socket.id} Disconnected`);
    });
};

export default socketHandlers;