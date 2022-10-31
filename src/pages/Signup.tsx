import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

import { Container, Button, Form } from "react-bootstrap";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");

	const { signup, isPending, error } = useSignup();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		signup(email, password, displayName);

		setEmail("");
		setPassword("");
		setDisplayName("");
	};

	return (
		<Container
			className="myBg rounded signup-wrapper my-sm-5 border p-5"
			fluid="sm"
		>
			<Form onSubmit={handleSubmit}>
				<h2 className="mb-4">Sign up</h2>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicDispalyName">
					<Form.Label>Display name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Display name"
						onChange={(e) => setDisplayName(e.target.value)}
						value={displayName}
					/>
				</Form.Group>

				{!isPending && (
					<Button variant="primary" type="submit">
						Submit
					</Button>
				)}
				{isPending && (
					<Button variant="primary" type="submit">
						Loading...
					</Button>
				)}
				{error && <p className="error">{error}</p>}
			</Form>
		</Container>
	);
};

export default Signup;
