import { css } from "lit-element";

export const formStyles = css`
form{
  padding: 2em;
  max-width: 800px;
  margin: auto;
}
p label{
  display: inline-block;
  margin-bottom: 5px;
}
.datepicker{
  width: 250px;
}
.datepicker button{
  height: 35px;
  margin: 0 0 0 10px;
  font-size: 1.5em;
  padding: 0px;
  background-color: transparent;
  line-height: 0px;
  border: none;
}

.nav{
  text-align: left;
}

.nav a{
  font-weight: bold;
  font-size: 1em;
  text-decoration: none;
  margin-left: 8px;
}

.form-row{
  display: flex;
}

.form-label{
  width: 50%;
  display:inline-block;
}

.form-input{
  width: 50%;
  display:inline-block;
}

.form-submit{
  min-width: 300px;
  text-align: center;
  display: inline-block;
}

/* Validaitions CSS */
.error-message {
  display: none;
}

input:not(:focus):not(:placeholder-shown):invalid {
  border-color: red;
}

input:not(:focus):not(:placeholder-shown):invalid ~ .error-message {
  display: block; 
}

input:not(:focus):not(:placeholder-shown):valid {
  border-color: green
}
`;