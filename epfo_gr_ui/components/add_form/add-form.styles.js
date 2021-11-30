import { css } from "lit-element";

export const formStyles = css`
form{
  padding: 2em;
  margin: auto;
  /* max-width: 600px; */
}

.left-section,
.right-section{
  display: inline-block;
  width: 48%;
  vertical-align: top;
  min-width: 400px;
}

/* .datepicker{
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
} */

input.size_3{
  min-width: initial;
  max-width: 35px;
}

input.size_7{
  min-width: initial;
  max-width: 75px;
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

.form-element{
  margin: 1em;
}

.form-element label{
  display: inline-block;
  margin-bottom: 5px;
}

.form-submit{
  min-width: 300px;
  text-align: center;
  display: inline-block;
}

.input-and-search{
  display: flex;
  align-items: center;
}

.input-and-search.prefix{
  color: #999999;
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

h2{
    color: var(--british-racing-green);
    text-align: center;
}
`;