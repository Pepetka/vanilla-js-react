const observer = <
	T extends { _onChange: (key: K, value: T[K]) => void, setOnChange: (newOnChange: (key: K, value: T[K]) => void) => void },
	K extends keyof T
>(obj: T) => {
	return new Proxy(obj, {
		set(target, key, value) {
			if (key === '_onChange') {
				throw new Error('Access denied. _onChange is private method.');
			}

			if (key === 'setOnChange') {
				throw new Error(`Access denied. setOnChange cannot be obtained`);
			}

			target[key as K] = value;
			target._onChange(key as K, value);

			return true;
		},
		get(target, key) {
			if (key === '_onChange') {
				throw new Error('Access denied. _onChange is private method.')
			}

			if (key === 'setOnChange') {
				return (newOnChange: (key: K, value: T[K]) => void) => {
					target._onChange = newOnChange;
				};
			}

			return target[key as K];
		}
	});
}

// interface IData {
// 	count: number;
// 	_onChange: (key: keyof IData, value: IData[keyof IData]) => void;
// 	setOnChange: (newOnChange: (IData['_onChange'])) => void;
// }
//
// const data: IData = {
// 	count: 0,
// 	_onChange: (key, value) => {
// 		console.log(`Изменено значение ${key}: ${value}`);
// 	},
// 	setOnChange: () => {},
// };
//
// const observedData = observer(data);
//
// observedData.count = 1;

export default observer;
