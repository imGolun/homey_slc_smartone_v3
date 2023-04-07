const { ZigBeeDevice } = require("homey-zigbeedriver");
const { CLUSTER } = require("zigbee-clusters");
const HzcSwitch2GangZigBeeDevice = require('../../lib/HzcSwitch2GangZigBeeDevice')

class S24029Device extends HzcSwitch2GangZigBeeDevice {
    async onNodeInit({ zclNode }) {

        this.app_inited = false
        this.params = {}

        if (!this.hasCapability('measure_power')) {
            await this.addCapability('measure_power')
        }

        if (this.hasCapability('meter_power')) {
            await this.removeCapability('meter_power')
        }

        this.registerCapability("dim", CLUSTER.LEVEL_CONTROL);

        this.registerSwitchOnoff(1)
        this.registerMeterPowerMeasurePower(1)

        this._init_app()

    }
}

module.exports = S24029Device;