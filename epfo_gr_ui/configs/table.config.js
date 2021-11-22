

  export const reportColumns = [
    {
      header: "Name",
      path: "visitor_name",
    },
    {
      header: "Organisation",
      path: "establishment_name",
    },
    {
      header: "UAN",
      path: "uan",
    },
    {
      header: "PF Account Number",
      path: "pf_account_no",
    },
    {
      header: "Section",
      path: "section",
    },
    {
      header: "Grievance Category",
      path: "grievance_category",
    },
    { 
      header: "Status", 
      path: "status" 
    }
  ]

  export const columnDefinition = [
    ...reportColumns
    ,
    {
      action: "edit",
    },
  ];