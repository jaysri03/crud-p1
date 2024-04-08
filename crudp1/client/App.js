import './App.css';
import{useState,useEffect}from 'react';
import Axios from 'axios';
function App(){
   
    const[studentName,setstudentname]=useState('')
    const[coures,setcoures]=useState('')
    const[studentlist,setstudentlist]=useState([]);
   
    const[newstudentName,setnewstudentName]=useState('');
   
    
     useEffect(()=>{
         Axios.get('http://localhost:3001/read')
        .then((response)=>{
        setstudentlist(response.data);
        })
        },[])
    const addstudentdata=()=>{
        Axios.post("http://localhost:3001/insert",
        {
         
            studentName:studentName,
            coures:coures
           
        });
    };
    const UpdatestudentData = (id) =>{
    Axios.put("http://localhost:3001/update", {
      id:id, newstudentName:newstudentName})
  }

  const DeleteData = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
      
  };


    return(
        <div className='App'>
        <h1>Student Details</h1>
        
        <label>studentName</label><br/><br/>
        <input type="text" placeholder="Name" required  onChange={(event)=>{setstudentname(event.target.value)}}/><br/><br/>
        <label>studentCoures</label><br/><br/>
        <input type="text" placeholder='coures' required  onChange={(event)=>{setcoures(event.target.value)}}/><br/><br/>
        <button onClick={addstudentdata}>submit</button>

        <table>
            <h3>GET DATA FROM DATABASE</h3>
            <tr>
                
                <th>studentName</th>
                <th>studentCoures</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            {studentlist.map((val,key) => {
            return    <tr>
       <td>{val.studentName}</td>
       <td>{val.coures}</td>  
        <td>
        <input type="text" placeholder="update studentname"
        onChange={(event) => {
          setnewstudentName(event.target.value);
        }}></input>
        <button onClick={()=> UpdatestudentData(val._id)}>Edit</button>
        </td>
        <td>
          <button onClick={()=> DeleteData(val._id)}>Delete</button>
          </td>  
       

                                       
                </tr>
             })}
                    
            
            
        </table>
        </div>
    );
    
}
export default App;