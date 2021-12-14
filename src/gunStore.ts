import Gun from "gun/gun"

Gun.chain["subscribe"] = function(publish) {
	var gun = this
	var at = gun._
	var isMap = !!at && !!at.back && !!at.back.each

	if (isMap) {
		var store = new Map()
		publish(Array.from(store))
		gun = gun.on((data, _key, as) => {
		var key = _key || ((data||{})._||{})['#'] || as.via.soul
		if (data === null) {
			store.delete(key)
		} else {
			store.set(key, data)
		}
		publish(Array.from(store))
		})
	} else {
		gun = gun.on(data => publish(data))
	}

	return gun.off
}

export const gun = Gun()
export default Gun