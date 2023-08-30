import './App.css';
import './style.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Form, Row, CloseButton } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import axios from 'axios';





function App() {
const [text, settext] = useState("")
const [todos, settodos] = useState([])
const [names, setname] = useState([])


const getdata= async ()=>{
     try {
          const {data}= await axios("https://fakestoreapi.com/products/category/jewelery")
          setname([...data]);
          
          
     } catch (error) {
          console.log(error.message)
     }

    
     
}


useEffect(()=>{
     console.log("mount")
     return () => console.log("unmount")
},[text])
console.log(names)


const addtodo=()=>{
     if(text.trim() && !todos.filter((item)=>item.text===text).length){
          
          settodos((last)=>[...last,{text,completed:false}]);
          toast.success('add is done', {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "colored",
               });
          
     }
     else{
          toast.error('undone', {
               position: "top-left",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "colored",
               });
     }
     settext("")
}



const deletitem = (index)=>{
    
     Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
               settodos((last)=>{
                    const help=[...last];
                    help.splice(index,1);
                    return [...help];
               })
               toast.success('delet is done', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });






          //   Swal.fire(
          //     'Deleted!',
          //     'Your file has been deleted.',
          //     'success'
          //   )
          }
        })

}

const changecolor= (index)=>{
     settodos((last)=>{
          const help=JSON.parse(JSON.stringify(last));
          help[index].completed = ! help[index].completed;
          return [...help];
     })
}

               
     return (
    <div className="App">
     {names.map((item)=>{
        return  <p>{item.price},{item.description}</p>
     })}


<Button variant='primary' onClick={getdata}>getdata</Button>

<ToastContainer/>
     
<Form onSubmit={(e)=>e.preventDefault()}>
     <Container>
      <Row >
       <Col sm={8}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter name" onKeyDown={(e)=>{if(e.key==="Enter"){addtodo()}}} 
        onChange={(e)=>settext(e.target.value)} value={text}/>
      </Form.Group>
      </Col>
      <Col sm={{offset:0, span:1}}>
      <Button variant="primary" onClick={addtodo}>
        Submit
      </Button>
      </Col>
      </Row>
      </Container>
    </Form>




{/*   
   <input onKeyDown={(e)=>{if(e.key==="Enter"){addtodo()}}} type={"text"} onChange={(e)=>settext(e.target.value)} value={text}></input>
   
<button type='submit' onClick={addtodo}>add</button> */}


<Container>
     <Row>
          
  {todos.map((item,index)=>{
  return (
           <Col md={4}>
          <Card key={index}
          bg={item.completed ? "success" : "danger"}     
          style={{ width: '18rem'  }}
          className="mb-2"
        >
         
          <Card.Body>
            <Card.Text >
            {item.text}
            </Card.Text>
            <Button  variant={item.completed ? 'danger':'success'} onClick={()=>changecolor(index)}>{item.completed ? "red" : "green"}</Button>
            <CloseButton  onClick={()=> deletitem(index)}/> 
          </Card.Body>
        </Card>
          </Col>
  )
   


     // return <div key={index}>
     //      <span style={{color: item.completed ? "green" : "red"}}>{item.text}</span>
     //       <button onClick={()=> deletitem(index)}>X</button>
     //       <button onClick={()=>changecolor(index)}>{item.completed ? "green" : "red"}</button> 
  
          //  </div>
  })}

  </Row>
  </Container>


  

  

     </div>
     );
     }


export default App;
