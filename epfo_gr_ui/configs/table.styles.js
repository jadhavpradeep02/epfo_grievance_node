import { css } from "lit-element";

export const grievanceTableStyles = css `

.table {
          display: grid;
          grid-template-columns: 12% 12% 12% 12% 12% 12% 12% 12%; 
          width: 100%;
          margin: auto;
      }

      .table > div {
        margin: 0px;
        background: var(--honeydew);
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
`