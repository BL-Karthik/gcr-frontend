import { useState } from "react"
const Student =({report})=>
{
   const [expandStudent,setExpandStudent]=useState("")


   const toggleStudent=(roll_number)=>
  {
    if(expandStudent===roll_number)
      setExpandStudent(null)
    else
      setExpandStudent(roll_number)
  }

    return (
        <div>
            <div className="student-section">
          <h2>Students</h2>

          <div className="student-table">
            <div className="student-header">

              <span>Student Name</span>

              <span>Roll Number</span>

              <span>Submitted</span>

              <span>Percentage</span>

              <span></span>
            </div>
            { report.students.map((student)=> (
                <div key={student.roll_number}>
                  <div className="student-row">
                    <span>
                      {student.student_name}
                    </span>
                    <span>
                      {student.roll_number}
                    </span>
                    <span>
                      {student.summary.total_submitted}/
                      {student.summary.total_assigned}
                    </span>
                    <span>{ Math.round((student.summary.total_submitted/
                      student.summary.total_assigned)*100)}%</span>
                    <button className="expand-button"
                    onClick={()=>toggleStudent(student.roll_number)}>
                      {
                        expandStudent===student.roll_number?"-":"+"
                      }

                    </button>

                  </div>
                  {
                    expandStudent===student.roll_number&&(

                      <div className="week-details">
                        <div className="week-header">
                         <span>Week</span>

                         <span>Submitted</span>

                         <span>Assigned</span>

                         <span>Percentage</span>

                        </div>
                        <div>
                           {Object.entries(student.week_wise_data).map(
                                   ([weekName, weekData], index) => {
                                 return (
                                     <div className="week-row" key={index}>

                                      <span>{weekName.replace("_", " ").toUpperCase()}</span>
                                      <span>{weekData.no_of_submitted}</span>
                                      <span> {weekData.no_of_assigned} </span>

                                      <span> {weekData.no_of_assigned > 0
                                       ? Math.round((weekData.no_of_submitted /weekData.no_of_assigned) *100 ) : 0}%
                                     </span>

                         </div>
      );
    }
  )}
</div>

                      </div>
                    )}
                </div>


              )) }

          </div>
        </div>
        </div>
    )
}

export default Student;