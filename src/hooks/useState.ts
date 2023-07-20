import observer from "../utils/observer.ts";

export interface IState<T> {
	value: T,
	_onChange: (key: keyof IState<T>, value: IState<T>[keyof IState<T>]) => void,
	setOnChange: (newOnChange: (key: keyof IState<T>, value: IState<T>[keyof IState<T>]) => void) => void
}

const useState = <T>( initialValue: T ) => {
	let state = observer<IState<T>, keyof IState<T>>({ value: initialValue, _onChange: () => {}, setOnChange: () => {} });

	const setState = (newValue: T | ((prevState: typeof state) => any)) => {
		if (typeof newValue === 'function') {
			(newValue as (prevSate: typeof state) => void)(state);
			return;
		}

		state.value = newValue;
	};

	return [state, setState] as const;
};

export default useState;
