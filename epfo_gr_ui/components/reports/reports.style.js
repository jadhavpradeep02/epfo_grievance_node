import { css } from "lit-element";

export const formStyles = css ` 
.main { 
    padding : 40px;
}
h1{
    text-align: center;
}
.range-select{
    padding: 10px;
    text-align: center;
}
.range-select input{
    margin: 15px;
}

label{
    display: inline-block;
    margin-top: 5px;
    margin-bottom: 8px;
}

.form-element{
    text-align: center;
    margin: 10px;
}

.step-label{
    text-align: center;
    color: var(--british-racing-green);
    display: block;
    margin: 25px;
    font-size: 1.2em;
    font-weight: bold;
}

.table {
    display: grid;
    grid-template-columns: 14% 14% 14% 14% 14% 14% 14%; 
    width: 100%;
    margin: auto;
}

.top-grivances .table,
.top-visitors .table {
  grid-template-columns: 25% 25% 25% 25%; 
}

.table {
  display: grid;
  grid-template-columns: 12% 12% 12% 12% 12% 12% 12% 12%; 
  width: 100%;
  margin: auto;
  font-size: 1em;
  font-family: 'Calibri', Courier, monospace;
}

.table > div {
margin: 0px;
background: #cccccc;
padding: 5px;
border: 1px solid white;
word-break: break-word;
text-overflow: ellipsis;
}

.table .header{
  font-weight: bold;
  background: var(--british-racing-green);
  color: white;
}

.action-container{
    text-align: center;
    margin: 25px;
}
.type-select{
    text-align: center;
}

.report-header{
    margin-bottom: 5px;
    color: var(--british-racing-green);
}

.report-header:last-child{
    margin-bottom: 20px;
}

.left-section,
.right-section{
    display: inline-block;
    width: 45%;
}

`