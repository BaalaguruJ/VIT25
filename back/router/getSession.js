const axios = require("axios")

const getSessionId = async (socket, roverNo) => {
    // setInterval(async () => {
        try {
            const sessionRes = await axios.post('https://fleetbots-production.up.railway.app/api/session/start')
            const sessionId = sessionRes.data.session_id 
            console.log('Session ID:', sessionId)
            socket.emit('getSession', sessionId) 

            const roverStatus = await axios.get(`https://fleetbots-production.up.railway.app/api/rover/Rover-${roverNo}/status?session_id=${sessionId}`)
            // console.log(roverStatus.data)
            socket.emit('roverStatus', roverStatus.data)

            const roverRes = await axios.get(`https://fleetbots-production.up.railway.app/api/rover/Rover-${roverNo}/coordinates?session_id=${sessionId}`)
            // console.log('Rover position data:', roverRes.data)
            socket.emit('roverPosition', roverRes.data)

            const sensorData = await axios.get(`https://fleetbots-production.up.railway.app/api/rover/Rover-${roverNo}/sensor-data?session_id=${sessionId}`)
            // console.log(sensorData.data)
            socket.emit('sensorData', sensorData.data)

            const batteryLevel = await axios.get(`https://fleetbots-production.up.railway.app/api/rover/Rover-${roverNo}/battery?session_id=${sessionId}`)
            // console.log(batteryLevel.data)
            socket.emit('batteryLevel', batteryLevel.data)

            return sessionId
        } catch (err) {
            console.error('Error:', err.message)
        }
    // }, 3000) 
}

module.exports = getSessionId
