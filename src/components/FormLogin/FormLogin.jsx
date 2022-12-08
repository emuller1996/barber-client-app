import axios from 'axios';
import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';


export default function FormLogin() {


    const [input, setInput] = useState('');
    const history = useHistory();


    const handleInput = function (e) {
        setInput( {...input , [e.target.name] : e.target.value} );

      };

      const handleSumbit = async (e)=>{
        e.preventDefault();
        console.log("handleSumbit")
        console.log(input)
        try {
            const result = await axios.post('/auth/signin',input,{
                headers: {
                'Content-Type': 'application/json'
                }
            });
        console.log(result.data)
        history.push('/Dashboard/')

        } catch (error) {
        console.log(error)
        console.log(error.message)
        }
        



        
      }



    return (
        <>
            <form action="" className=' p-4' autoComplete='off' onSubmit={handleSumbit}>
                <div className="row justify-content-md-center">
                    <div className="col-md-8">
                        <div className="login">
                            <p>Ingrese sus credenciales</p>
                            <div class="form-group">
                                <input type="email" class="form-control input-appointment"  onChange={handleInput} value={input.email} id="email" name="email" placeholder="Correo" />
                            </div>

                            <div class="form-group">
                                <input type="password" class="form-control input-appointment"  onChange={handleInput}  value={input.password} id="password" name="password" placeholder="Contraseña" />
                            </div>

                            <button type="submit" class="btn btn-dark rounded-0">Submit</button>


                        </div>

                    </div>

                </div>
            </form>
        </>
    )
}