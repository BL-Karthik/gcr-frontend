
const Summary=({report})=>
{

    const totalAssigned=report.students.reduce(
    (total,student)=>{return total+student.summary.total_assigned

    },0);

  const totalSubmitted =report.students.reduce((total,student)=>
{
    return total+student.summary.total_submitted
    
},0);

const overallpercentage=totalAssigned>0?Math.round((totalSubmitted/totalAssigned)*100):0

    return(
        <div>
         <div className="report-header">
          <div>
            <h2>{report.course_name}</h2>
            <p>
              Assignmenets Up to Week {report.week_upto}
            </p>
          </div>
        </div>

        <div className="summary">
          <div className="summary-card">
            <span>Total Students</span>
            <strong> : {report.students.length}</strong>
          </div>

          <div className="summary-card">
            <span>Submission Percentage</span>
            <strong>
              : {overallpercentage}%
            </strong>
          </div>

        </div>
        </div>
    )
}
export default Summary;