
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const getAssingments=async(courseName,weekUpto)=>
// {
//     const response= await fetch(
         
//         `${BASE_URL}/assignments/course/${encodeURIComponent
//             (courseName)}/week/${weekUpto}`

//     )
//     if(!response.ok)
//     {
//         throw new Error("Failed to fetch assignmensts")
//     }

//     return await response.json();
    
// }


export const getReports=async(batchName,startWeek,endWeek)=>
{
    const response=await fetch(
        `${BASE_URL}/assignments/report/${encodeURIComponent(batchName)}/week/${startWeek}/${endWeek}`
    )

    if(!response.ok)
    {
        throw new Error("Failed to genertae the Reports")
    }
    return await response.json()
}



// const getCoursesName=async()=>
// {
  
//     const response=await fetch(
//         `${BASE_URL}/courses`)
//         if(!response.ok)
//         {
//             throw new Error('Failed to Fetch Courses Names(${response.status})');
//         }
//         return await response.json();
// }

//  export  default getCoursesName;
