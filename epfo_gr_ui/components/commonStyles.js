import { css } from "lit-element";

export const commonStyles = css `
.launch-block{
    width: 80%;
    background-color: white;
    margin: auto;
    margin-bottom: 25px;
    border-radius: 10px;
    -webkit-box-shadow: -1px 3px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: -1px 3px 5px 0px rgba(0,0,0,0.75);
    box-shadow: -1px 3px 5px 0px rgba(0,0,0,0.75);
}

.launch-block.form{
    width: 60%;
    min-width: 600px;
}

lion-button,
.link-button,
button{
    background-color: var(--british-racing-green);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
}

.calendar__overlay-frame{
    border-color: var(--charcoal)
}

.error-div{
    padding: 1em;
    color: #842029;
    background-color: #f8d7da;
    border: 1px solid  #842029;
    border-radius: 5px;
    margin: 2em;
}

input, select{
    height: 2em;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    padding-left: 10px;
    border: 1px solid #ced4da;
    vertical-align: middle;
}

input[type="text"],
input[type="number"]{
    min-width: 300px;
    margin-bottom: 1em;
}

.search-form input{
    width: 80%;
    height: 3em;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    padding-left: 10px;
    border: 1px solid #ced4da;
}

input:focus-visible{
    outline: var(--british-racing-green) auto 1px;
}

nav{
    background-color: #cccccc;
    padding: 5px;
    margin: 10px 0px;
    text-align: left;
}

.options-container{
    margin: 16px 16px 0;
    text-align: center;
}

/* Results table */

.table {
    display: grid;
    grid-template-columns: 14% 14% 14% 14% 14% 14% 14% ; 
    width: 100%;
    margin: auto;
}

.table > div {
  margin: 0px;
  background: var(--honeydew);
  padding: 5px;
  border: 1px solid var(--light-gray);
  word-break: break-word;
  text-overflow: ellipsis;
}

.table .header{
    font-weight: bold;
    background: var(--british-racing-green);
    color: white;
}

/* .table > div:nth-child(6n+2) {
  background: white;
}

.table > div:nth-child(6n+3) {
  background: gray;
} */
`;