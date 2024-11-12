import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function FutureMe() {
	const [message, setMessage] = useState('');
	const [sendDate, setSendDate] = useState('');
	const [image, setImage] = useState(null);
	const [video, setVideo] = useState(null);
	const [scheduledMessages, setScheduledMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchScheduledMessages = async () => {
			setLoading(true);
			setError(null);
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					setError('User not authenticated');
					return;
				}

				const response = await fetch('http://localhost:5000/api/scheduled', {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`,
					},
				});

				if (response.ok) {
					const result = await response.json();
					setScheduledMessages(result.messages);
				} else {
					setError('Failed to fetch scheduled messages');
				}
			} catch (error) {
				setError('Error fetching scheduled messages');
				console.error('Error fetching scheduled messages:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchScheduledMessages();
	}, []);

	const handleMessageChange = (e) => setMessage(e.target.value);
	const handleSendDateChange = (e) => setSendDate(e.target.value);

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith('image/')) {
			setImage(file);
		} else {
			alert('Please upload a valid image file.');
		}
	};

	const handleVideoUpload = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith('video/')) {
			setVideo(file);
		} else {
			alert('Please upload a valid video file.');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('msg', message);
		formData.append('date', sendDate);
		if (image) formData.append('image', image);
		if (video) formData.append('video', video);

		try {
			const response = await fetch('http://localhost:5000/api/schedule', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
				body: formData,
			});

			if (response.ok) {
				const result = await response.json();
				setScheduledMessages((prevMessages) => [...prevMessages, result.newMessage]);

				// Reset form after submission
				setMessage('');
				setSendDate('');
				setImage(null);
				setVideo(null);
				alert('Your message has been scheduled for delivery!');
			} else {
				alert('Failed to schedule the message. Please try again later.');
			}
		} catch (error) {
			alert('An error occurred. Please try again later.');
			console.error('Error submitting form:', error);
		}
	};

	const isMessageVisible = (scheduledDate) => {
		const currentDate = new Date();
		const messageDate = new Date(scheduledDate);
		return currentDate >= messageDate;
	};

	return (
		<div className="FutureMe">
			<header>
				<nav className="navbar">
					<ul>
						<li><Link to="/secondhome">Home</Link></li>
						<li><Link to="/knowme">Know me</Link></li>
						<li><Link to="/timeline">Interactive Timeline</Link></li>
						<li><Link to="/futureme">Future Me</Link></li>
						<li><Link to="/mission">Our Mission</Link></li>
						<li><Link to="/contact">Contact Us</Link></li>
					</ul>
				</nav>
			</header>

			<main>
				<section>
					<h2 className="e">Send a message to your future self</h2>
					<form id="futureMeForm" onSubmit={handleSubmit}>
						<label htmlFor="message">Dear Future Me:</label>
						<textarea
							id="message"
							name="message"
							rows="5"
							placeholder="Write here..."
							value={message}
							onChange={handleMessageChange}
						></textarea>

						<label htmlFor="sendDate">When should this message be delivered?</label>
						<input
							type="date"
							id="sendDate"
							name="sendDate"
							value={sendDate}
							onChange={handleSendDateChange}
							required
						/>

						<div className="file-upload-container">
							<div>
								<label htmlFor="imageUpload">Image: </label>
								<input
									type="file"
									id="imageUpload"
									name="imageUpload"
									accept="image/*"
									onChange={handleImageUpload}
								/>
							</div>
							<div>
								<label htmlFor="videoUpload">Video: </label>
								<input
									type="file"
									id="videoUpload"
									name="videoUpload"
									accept="video/*"
									onChange={handleVideoUpload}
								/>
							</div>
						</div>

						<button type="submit">Schedule Message</button>
					</form>
				</section>

				<section>
					<h4>Your Scheduled Messages</h4>
					{loading ? (
						<p>Loading scheduled messages...</p>
					) : error ? (
						<p>{error}</p>
					) : (
						<div id="scheduledMessages">
							{scheduledMessages.length === 0 ? (
								<p>No scheduled messages.</p>
							) : (
								<ul>
									{scheduledMessages.map((msg, index) => (
										<li key={index}>
											<p><strong>Send Date:</strong> {new Date(msg.date).toLocaleDateString('en-US', {
													weekday: 'long', // "Monday"
													year: 'numeric', // "2024"
													month: 'long', // "November"
													day: 'numeric', // "19"
												})}</p>
											{isMessageVisible(msg.date) && (
												<>
													<p><strong>Message:</strong> {msg.msg}
													</p>
													{msg.img && (
														<div>
															<strong>Image:</strong>
															<img src={`http://localhost:5000/${msg.img}`} alt="Uploaded" style={{ maxWidth: '200px' }} />
														</div>
													)}
													{msg.vid && (
														<div>
															<strong>Video:</strong>
															<video src={`http://localhost:5000/${msg.vid}`} controls style={{ maxWidth: '200px' }} />
														</div>
													)}
												</>
											)}
										</li>
									))}
								</ul>
							)}
						</div>
					)}
				</section>
			</main>
		</div>
	);
}

export default FutureMe;
