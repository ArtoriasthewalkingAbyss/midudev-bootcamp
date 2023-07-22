
function Notification ({ notification }) {
	let classStyle;
	if (notification.includes("Added")) {
		classStyle = "add";
	} else if (notification.includes("Delete")) {
		classStyle = "delete";
	} else if (notification.includes("Update")) {
		classStyle = "update";
	}
    
	return (
		<section className={classStyle}>
			{notification}
		</section>
	);
}

export {Notification};