import { useState } from "react";
import { BiMailSend } from "react-icons/bi";

const Newsletter = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setEmail("");
	};

	return (
		<div className=" newsletter shadow-sm bg-light p-5">
			<p className="display-3 text-center">Newsletter</p>
			<p className="lead text-center mb-4">
				Get timely updates from your favorite products
			</p>
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="d-flex justify-content-center"
			>
				<input
					onChange={(e) => setEmail(e.currentTarget.value)}
					className="px-2 py-1"
					placeholder="Your email"
					type="email"
					value={email}
				/>
				<button className="border-0 px-4 text-light fs-4 bg-success">
					<BiMailSend />
				</button>
			</form>
		</div>
	);
};
export default Newsletter;
