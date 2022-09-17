import styled from 'styled-components';
import { FormState } from '../Form';
import { useContext } from 'react';

const FormLeftWrapper = () => {
  const Handler = useContext(FormState);

  return (
    <FormLeft>
      <FormInput>
        <label>Campaign Title</label>
        <Input onChange={Handler.FormHandler} value={Handler.form.campaignTitle} placeholder='Campaign Title' name='campaignTitle'>
        </Input>
      </FormInput>
      <FormInput>
        <label>Story</label>
        <TextArea onChange={Handler.FormHandler} value={Handler.form.story} name="story" placeholder='Describe Your Story'>
        </TextArea>
      </FormInput>
    </FormLeft>
  )
}

const FormLeft = styled.div`
  width:48%;
`

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
  color: white;
`
const Input = styled.input`
  padding:15px;
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
  box-shadow: 0 0 0px 0px #17b2ff;
  -webkit-border-radius: 20px !important;
  -moz-border-radius: 20px !important;
  border-radius: 20px !important;
  -webkit-border: 20px !important;
  -moz-border: 20px !important;
  border: 20px !important;
`

const TextArea = styled.textarea`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  font-family: "Segoe UI";
  margin-top:4px;
  border:none;
  border-radius:8px ;
  outline:none;
  font-size:large;
  max-width:100%;
  min-width:100%;
  overflow-x:hidden;
  min-height:160px ;
  box-shadow: 0 0 0px 0px #17b2ff;
  -webkit-border-radius: 20px !important;
  -moz-border-radius: 20px !important;
  border-radius: 20px !important;
  -webkit-border: 20px !important;
  -moz-border: 20px !important;
  border: 20px !important;
`

export default FormLeftWrapper;