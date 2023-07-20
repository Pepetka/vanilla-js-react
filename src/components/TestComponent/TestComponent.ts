import useState from "../../hooks/useState.ts";
import useNavigate from "../../hooks/useNavigate.ts";
import {createElement} from "../../utils/render.ts";
import {getCharacterPagePath} from "../../router/routerConfig.ts";
import {ComponentType} from "../../types/types.ts";

const TestComponent: ComponentType = () => {
	const [count, setCount] = useState(0);
	const [inputValue, setInputValue] = useState('');
	const navigate = useNavigate();

	const onIncr = () => {
		setCount((prevState) => prevState.value++);
	};

	const onDecr = () => {
		setCount((prevState) => prevState.value--);
	};

	const onSubmit = () => {
		navigate(getCharacterPagePath(inputValue.value))
	};

	const onInput = ({ target }: { target: HTMLInputElement }) => {
		if (!target.value) return;

		setInputValue(target.value);
	};

	const getContent = () => `${count.value}`;

	const ButtonIncr = () => createElement('button', { onClick: onIncr }, () => "+");
	const ButtonDecr = () => createElement('button', { onClick: onDecr }, () => "-");
	const Buttons = () => createElement('div', { style: { display: "flex", gap: "16px", justifyContent: "center" } }, ButtonDecr, ButtonIncr);

	const input = () => createElement('input', { placeholder: "Character Id", onInput });
	const form = () => createElement('form', { onSubmit }, input);

	return () => createElement('div', {  style: { display: "flex", gap: "16px", flexDirection: "column" }, state: count }, getContent, Buttons, form);
};

export default TestComponent;
