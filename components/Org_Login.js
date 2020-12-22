import styled from 'styled-components'

export default function SignIn({ csrfToken }) {
  return (
      <StyledForm method='post' action='http://localhost:3000/api/auth/signin/email'>
        {console.log(csrfToken)}
      <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
      
      
        <StyledInput type='text' id='email' name='email' placeholder='Email' />
      <StyledButton type='submit'>Sign in with Email</StyledButton>
    </StyledForm>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context)
  }
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StyledInput = styled.input`
    width: 100%;
    background: none;
    border: none;
    border-bottom: 1px solid #e1e1e1;
    margin-bottom: 1rem;
    padding: 5px 0;
`

const StyledButton = styled.button`
    background: none;
    text-transform: lowercase;
    border: none;
    color: #e1e1e1;
    text-decoration: underline;
    text-align: center;
`