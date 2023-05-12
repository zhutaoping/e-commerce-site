import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

import { Container, Button, Form } from "react-bootstrap";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, isPending, error } = useLogin();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login(email, password);

		setEmail("");
		setPassword("");
	};

	return (
		<Container className="login myBg rounded my-sm-5 border p-5" fluid>
			<Form onSubmit={handleSubmit}>
				<h2 className="mb-4">Log in</h2>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
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
				{!isPending && (
					<Button variant="primary" type="submit">
						Submit
					</Button>
				)}
				{isPending && (
					<Button variant="primary" type="submit" disabled>
						Loading...
					</Button>
				)}
				{error && <p className="error">{error}</p>}
			</Form>
		</Container>
	);
};

export default Login;
