// Function to handle user deletion
function deleteAction(uniqueId) {
	if (confirm("Are you sure you want to delete this action?")) {
		// Send a DELETE request to the server
		fetch(`/buddy_actions/delete/${uniqueId}`, {
			method: 'DELETE'
		})
		.then(response => {
			if (response.ok) {
				// Entry deleted successfully, reload the page
				location.reload();
			} else {
				// Handle error case
				alert('Failed to delete buddy entry. Please try again.');
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert('An error occurred. Please try again.');
		});
	}
}

// Function to handle form submission for adding a new entry
function addAction(event) {
	event.preventDefault(); // Prevent form submission
	// Get form values
	const receivedOn = document.getElementById('wimpReceivedon').value;
	const buddyPayload = document.getElementById('wimpBuddypayload').value;
	const buddyPayloadExecutionStatus = document.getElementById('wimpBuddypayloadexecutionstatus').value;
	const notificationMessage = document.getElementById('wimpNotificationmessage').value;
	const notificationDeliveryStatus = document.getElementById('wimpNotificationdeliverystatus').value;
    
	// Create wimp object
	const wimp = {
		receivedOn: receivedOn,
		buddyPayload: buddyPayload,
		buddyPayloadExecutionStatus: buddyPayloadExecutionStatus,
		notificationMessage: notificationMessage,
		notificationDeliveryStatus: notificationDeliveryStatus
	};
	alert(wimp.buddyPayload.value);
	// Send a POST request to the server
	fetch('/buddy_actions/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(wimp)
	})
	.then(response => {
		if (response.ok) {
			// User added successfully, reload the page
			location.reload();
		} else {
			// Handle error case
			alert('Failed to add payload. Please try again.');
		}
	})
	.catch(error => {
		console.error('Error:', error);
		alert('An error occurred. Please try again.');
	});
}

// Function to handle user edit
function editAction(uniqueID) {
	// Redirect to the edit page with the payload's unique ID
	window.location.href = `/buddy_actions/edit/${uniqueID}`;
}