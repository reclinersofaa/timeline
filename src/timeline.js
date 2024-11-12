import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';

const InteractiveTimeline = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);
    const [formValues, setFormValues] = useState({
        ECont: '',           // Matched with TimelineModel field
        EDate: '',           // Matched with TimelineModel field
        EStory: '',        // Matched with TimelineModel field
        imagePreview: '',
        videoPreview: '',
        currentImage: '',    // For EImg from TimelineModel
        currentVideo: ''     // For EVid from TimelineModel
    });
    const timelineRef = useRef(null);
    const timelineInstance = useRef(null);
    const items = useRef(new DataSet([]));

    useEffect(() => {
        fetchEvents();
        if (!timelineInstance.current && timelineRef.current) {
            const options = {
                width: '100%',
                height: '400px',
                editable: false,
                margin: { item: 10 },
            };
            timelineInstance.current = new Timeline(timelineRef.current, items.current, options);

            timelineInstance.current.on('click', async (properties) => {
                const clickedItemId = properties.item;
                if (clickedItemId) {
                    await fetchEventDetails(clickedItemId);
                }
            });
        }
    }, []);

    const fetchEvents = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found, user is not authorized");
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/events', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                const fetchedItems = data.map((event) => ({
                    id: event._id,
                    content: event.ECont,
                    start: event.EDate,
                    EStory: event.EStory,
                    EImg: event.EImg,
                    EVid: event.EVid
                }));
                items.current.clear();
                items.current.add(fetchedItems);
                timelineInstance.current.setItems(items.current);
            } else {
                console.error('Failed to fetch events:', data.message);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchEventDetails = async (eventId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:5000/api/event/${eventId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const event = await response.json();
            if (response.ok) {
                setCurrentItemId(eventId);
                setFormValues({
                    ECont: event.ECont,
                    EDate: new Date(event.EDate).toISOString().split('T')[0],
                    EStory: event.EStory || '',
                    imagePreview: '',
                    videoPreview: '',
                    currentImage: event.EImg ? `http://localhost:5000/${event.EImg}` : '',
                    currentVideo: event.EVid ? `http://localhost:5000/${event.EVid}` : ''
                });
                setModalVisible(true);
            }
        } catch (error) {
            console.error('Error fetching event details:', error);
        }
    };

    const openAddEventModal = () => {
        setCurrentItemId(null);
        setFormValues({
            ECont: '',
            EDate: '',
            EStory: '',
            imagePreview: '',
            videoPreview: '',
            currentImage: '',
            currentVideo: ''
        });
        setModalVisible(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Using exact field names expected by multer and TimelineModel
        formData.append('ECont', formValues.ECont);
        formData.append('EDate', formValues.EDate);
        formData.append('EStory', formValues.EStory);
        
        // Matches multer field names in timelineR.js
        if (formValues.imagePreview) {
            formData.append('image', formValues.imagePreview);
        }
        if (formValues.videoPreview) {
            formData.append('video', formValues.videoPreview);
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found, user is not authorized");
            return;
        }

        try {
            const url = currentItemId 
                ? `http://localhost:5000/api/event/${currentItemId}`
                : 'http://localhost:5000/api/event';
            
            const method = currentItemId ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            
            const data = await response.json();
            if (response.ok) {
                await fetchEvents();
                closeModal();
            } else {
                console.error('Failed to handle event:', data.message);
            }
        } catch (error) {
            console.error('Error handling event:', error);
        }
    };

    const deleteEvent = async () => {
        if (currentItemId) {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch(`http://localhost:5000/api/event/${currentItemId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                
                if (response.ok) {
                    await fetchEvents(); // Refresh the timeline after deletion
                    closeModal();
                } else {
                    const data = await response.json();
                    console.error('Failed to delete event:', data.message);
                }
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setCurrentItemId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setFormValues((prev) => ({
                ...prev,
                [`${type}Preview`]: file,
                [`current${type.charAt(0).toUpperCase() + type.slice(1)}`]: URL.createObjectURL(file)
            }));
        }
    };

    return (
        <div className="Timeline">
            <header>
                <h1>Interactive Timeline</h1>
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
                    <h2>Your Timeline</h2>
                    <div ref={timelineRef} style={{ width: '100%' }}></div>
                    <button
                        onClick={openAddEventModal}
                        style={{
                            marginTop: '200px',
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Add Event
                    </button>
                </section>

                {modalVisible && (
                    <div className="modal" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span className="close" onClick={closeModal}>&times;</span>
                            <h3>{currentItemId ? 'Edit Event' : 'Add New Event'}</h3>
                            <form onSubmit={handleFormSubmit}>
                                <label>Event Content:</label>
                                <input
                                    type="text"
                                    name="ECont"
                                    value={formValues.ECont}
                                    onChange={handleInputChange}
                                    required
                                />

                                <label>Event Date:</label>
                                <input
                                    type="date"
                                    name="EDate"
                                    value={formValues.EDate}
                                    onChange={handleInputChange}
                                    required
                                />

                                <label>Your Story:</label>
                                <textarea
                                    name="EStory"
                                    rows="4"
                                    value={formValues.EStory}
                                    onChange={handleInputChange}
                                />

                                <label>Upload Image:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'image')}
                                />
                                {(formValues.currentImage || formValues.imagePreview) && (
                                    <img 
                                        src={formValues.imagePreview ? URL.createObjectURL(formValues.imagePreview) : formValues.currentImage} 
                                        alt="Preview" 
                                        style={{ maxWidth: '100%', marginTop: '10px' }} 
                                    />
                                )}

                                <label>Upload Video:</label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => handleFileUpload(e, 'video')}
                                />
                                {(formValues.currentVideo || formValues.videoPreview) && (
                                    <video controls style={{ maxWidth: '100%', marginTop: '10px' }}>
                                        <source 
                                            src={formValues.videoPreview ? URL.createObjectURL(formValues.videoPreview) : formValues.currentVideo} 
                                            type="video/mp4" 
                                        />
                                    </video>
                                )}

                                <button type="submit" style={{ marginTop: '10px' }}>
                                    {currentItemId ? 'Update Event' : 'Add Event'}
                                </button>
                                {currentItemId && (
                                    <button
                                        type="button"
                                        onClick={deleteEvent}
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            marginTop: '10px',
                                            padding: '10px 20px',
                                        }}
                                    >
                                        Delete Event
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default InteractiveTimeline;
