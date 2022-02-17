

export const visitorColumns = [
  {
    header: "Name",
    path: "visitor_name",
  },
  {
    header: "Id",
    path: "visitor_id",
  },
  {
    header: "Contact",
    path: "visitor_mobile",
  },
  {
    header: "Email",
    path: "visitor_email",
  }
]

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

  export const highestVisitorTableCols = [
    {
      header: "Member Name",
      path: "member_name",
    },
    {
      header: "member mobile number",
      path: "member_phone",
    },
    {
      header: "Last Visit",
      path: "visited_at",
      type: "datetime"
    },
    { 
      header: "Total Visit", 
      path: "no_of_visit"
    }
  ]

  export const highestPendingTableCols = [
    {
      header: "Establishment Name",
      path: "establishment_name",
    },
    {
      header: "Section",
      path: "section",
    },
    {
      header: "First Entry",
      path: "created_at",
      type: "datetime"
    },
    { 
      header: "Total Visit", 
      path: "no_of_visit"
    }
  ]

  export const columnDefinition = [
    ...reportColumns
    ,
    {
      action: "edit",
    },
  ];

  export const establishmentColumns = [
    {
      header: "Establishment Name",
      path: "establishment_name",
    },
    {
      header: "Establishment Id",
      path: "establishment_id",
    },
    {
      header: "Task Id",
      path: "estb_account_task_id",
    },
    {
      action: "edit",
    }
  ]

  export const membersColumns = [
    {
      header: "Member Name",
      path: "member_name",
    },
    {
      header: "Member Phone",
      path: "member_phone",
    },
    {
      header: "UAN",
      path: "uan",
    },
    {
      header: "PF Account number",
      path: "pf_account_no",
    }
  ]

  export const grievanceColumns = [
    {
      header: "Grievance ID",
      path: "grievance_id"
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
      header: "Date Created",
      path: "created_at",
      type: "datetime"
    },
    { 
      header: "Status", 
      path: "status" 
    }
  ]