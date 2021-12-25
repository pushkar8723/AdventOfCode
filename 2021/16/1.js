process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const binStr = lines[0].split('').map(char => `0000${parseInt(char, 16).toString(2)}`.slice(-4)).join('');

    /**
     * Each packet has following properties.
     * `version`: Version of the packet.
     * `id`: ID of the packet.
     * `value`: Value of the packet.
     * `packets`: Array of Sub-packets.
     * 
     * @typedef {{
     *   version: Number,
     *   id: Number,
     *   value: Number,
     *   packets: Packet[]
     * }} Packet
     */
    
    /**
     * Parses the given sub-packet group by group, in a group of 5 bits,
     * and returns value as well as left over bits.
     * 
     * @param {String} subPacket 
     * @returns {[Number, String]}
     */
    const parseValue = (subPacket) => {
        let hasNext = false;
        let i = 0;
        const values = [];
        do {
            const group = subPacket.substr(i, 5);
            hasNext = (group[0] === '1');
            values.push(subPacket.substr(i+1, 4));
            i += 5;
        } while(hasNext);
        const remaining = subPacket.substr(i);
        return [parseInt(values.join(''), 2), remaining];
    }

    /**
     * Parses the given packet and returns the packet tree as well as
     * leftover bits.
     * 
     * @param {String} packet 
     * @returns {[Packet, String]}
     */
    const parsePacket = (packet) => {
        /** Version of the current packet. Calculated from first 3 bits. */
        const version = parseInt(packet.substr(0, 3), 2);
        
        /** ID of the current packet. Calculated from bits 4th bit to 6th bit. */
        const id = parseInt(packet.substr(3, 3), 2);
        
        /**
         * Value of the current packet
         * @type {Number}
         */
        let value;
        
        /**
         * Bits left after parsing the current packet.
         * @type {String}
         */
        let left;
        
        /**
         * Child packets of current packet.
         * @type {Packet[]}
         */
        let packets = [];

        if (id === 4) {
            // The packet is a literal value.
            const [val, remaining] = parseValue(packet.substr(6));
            value = val;
            left = remaining;
        } else {
            // The packet is an operator. Hence parse sub-packets first.
            const lengthTypeID = packet.substr(6, 1);
            if (lengthTypeID === '0') {
                // 15 bits from 8th bit represents the combined length of sub-packets.
                const packetLength = parseInt(packet.substr(7, 15), 2);;

                // Since, we don't know end points of each packet, we pass the entire packet
                // bits iteratively, until we don't have anything left to parse.
                let next = packet.substr(22, packetLength);
                do {
                    const [parsedPacket, remaining] = parsePacket(next);
                    packets.push(parsedPacket);
                    next = remaining;
                } while (next);

                // Leftover bits would be bits that are not included in packet length.
                left = packet.substr(22 + packetLength);
            } else {
                // 11 bits from 8th bit represents the number of sub-packets.
                let packetCount = parseInt(packet.substr(7, 11), 2);

                // Since, we don't know end points of each packet, we pass the entire packet
                // bits iteratively, until we have sub-packets equal to packet count.
                let next = packet.substr(18);
                while (packetCount) {
                    const [parsedPacket, remaining] = parsePacket(next);
                    packets.push(parsedPacket);
                    next = remaining;
                    packetCount--;
                }

                // Whatever was not parsed is the leftover bits.
                left = next;
            }
            
            if (id === 0) {
                // Value of current packet is sum of sub-packets.
                let sum = 0;
                packets.forEach(child => {
                    sum += child.value;
                });
                value = sum;
            } else if (id === 1) {
                // Value of current packet is product of sub-packets.
                let product = 1;
                packets.forEach(child => {
                    product *= child.value;
                });
                value = product;
            } else if (id === 2) {
                // Value of current packet is the minimum of sub-packets values.
                value = Math.min(...packets.map(child => child.value));
            } else if (id === 3) {
                // Value of current packet is the maximum of sub-packets values.
                value = Math.max(...packets.map(child => child.value));
            } else if (id === 5) {
                // Value of current packet is 1 if first sub-packet's value is
                // greater than second sub-packet's value. Otherwise, the value
                // of current packet is 0.
                value = (packets[0].value > packets[1].value) ? 1 : 0;
            } else if (id === 6) {
                // Value of current packet is 1 if first sub-packet's value is
                // less than second sub-packet's value. Otherwise, the value
                // of current packet is 0.
                value = (packets[0].value < packets[1].value) ? 1 : 0;
            } else if (id === 7) {
                // Value of current packet is 1 if first sub-packet's value is
                // equal to second sub-packet's value. Otherwise, the value
                // of current packet is 0.
                value = (packets[0].value === packets[1].value) ? 1 : 0;
            } else {
                throw new Error('Invalid Operator');
            }
        }
        return [{
            version,
            id,
            value,
            packets
        }, left];
    }

    const [tree] = parsePacket(binStr);

    /**
     * Returns sum of all version in the packet tree.
     * 
     * @param {Packet} root 
     * @returns {Number}
     */
    const getVersionSum = (root) => {
        let sum = root.version;
        root.packets.forEach(child => {
            sum += getVersionSum(child);
        });
        return sum;
    }

    // console.log(JSON.stringify(tree, null, 2));
    console.log(getVersionSum(tree));
    console.log(tree.value);
});
