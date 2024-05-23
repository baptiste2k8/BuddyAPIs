// Clear form fields when modal is shown
$('#wimpModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var uniqueID=button.data("wimp-id");
    var receivedOn = button.data("wimp-receivedon");
    var buddyPayload = button.data("wimp-buddypayload");
    var buddyPayloadExecutionStatus = button.data("wimp-buddypayloadexecutionstatus");
    var buddyPayloadExecutionOutcome = button.data("wimp-buddypayloadexecutionoutcome");
    var triggeringEvent = button.data("wimp-triggeringevent");
    var modal = $(this);
    modal.find('#wimpId').val(uniqueID);
    modal.find('#wimpReceivedon').val(receivedOn);
    modal.find('#wimpBuddypayload').val(buddyPayload);
    modal.find('#wimpBuddypayloadexecutionstatus').val(buddyPayloadExecutionStatus);
    modal.find('#wimpBuddypayloadexecutionoutcome').val(buddyPayloadExecutionOutcome);
    modal.find('#wimpTriggeringevent').val(triggeringEvent);
});

// Clear form fields when modal is hidden
$('#wimpModal').on('hidden.bs.modal', function () {
    var modal = $(this);
    modal.find('#wimpForm')[0].reset();
});

// Function to handle user save (create/update)
function saveAction(event) {
    event.preventDefault(); // Prevent form submission 
    // Get form values   
    var uniqueID = document.getElementById('wimpId').value;
    var receivedOn = document.getElementById('wimpReceivedon').value;
    var buddyPayload = document.getElementById('wimpBuddypayload').value;
    var buddyPayloadExecutionStatus = document.getElementById('wimpBuddypayloadexecutionstatus').value;
    var buddyPayloadExecutionOutcome = document.getElementById('wimpBuddypayloadexecutionoutcome').value;
    var triggeringEvent = document.getElementById('wimpTriggeringevent').value;
   // Create wimp object
	var wimp = {
		receivedOn: receivedOn,
		buddyPayload: buddyPayload,
		buddyPayloadExecutionStatus: buddyPayloadExecutionStatus,
		buddyPayloadExecutionOutcome: buddyPayloadExecutionOutcome,
		triggeringEvent: triggeringEvent
	};
    console.log(`receivedOn...${wimp.receivedOn}`);
    if (uniqueID) {
        // Update existing wimp entry
        wimp.uniqueID = uniqueID;
        fetch(`/buddy_actions/update/${uniqueID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wimp)
        })
        .then(response => {
            if (response.ok) {
                // wimp request updated successfully, reload the page
                location.reload();
            } else {
                // Handle error case
                alert('Failed to update buddy. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    } else {
        // Create new wimp entry
        fetch('/buddy_actions/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wimp)
            
        })
        .then(response => {
            if (response.ok) {
                // Wimp added successfully, reload the page
                location.reload();
                
            } else {
                // Handle error case
                alert('Failed to add buddy action......... Please try again.');
                
                
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error);
            alert('An error occurred. Please try again.');
        });
    }
}