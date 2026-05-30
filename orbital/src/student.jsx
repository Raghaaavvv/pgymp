function Student(props) {
    return(
        <div className = "student-info">
            <p> Name: {props.name}</p>
            <p> Block: {props.block}</p>
            <p> Is Resident: {props.isResident ? "Yes" : "No"}</p>
        </div>
    );
}

export default Student;