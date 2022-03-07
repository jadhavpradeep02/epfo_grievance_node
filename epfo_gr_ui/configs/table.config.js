

export const visitorColumns = [
  {
    header: "Name",
    path: "visitor_name",
  },
  {
    header: "No. of Visits",
    path: "no_of_visit",
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
      header: "Visitor Name",
      path: "visitor_name",
    },
    {
      header: "Visitor mobile number",
      path: "visitor_mobile",
    },
    {
      header: "Last Visit",
      path: "visited_at",
      type: "datetime"
    },
    { 
      header: "Total Visits", 
      path: "no_of_visit"
    }
  ]

  export const highestPendingTableCols = [
    {
      header: "Member Name",
      path: "member_name",
    },
    {
      header: "Status",
      path: "status",
    },
    {
      header: "Grievance Category",
      path: "grievance_category",
    },
    { 
      header: "Task id", 
      path: "estb_account_task_id"
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

  export const usersColumns = [
    {
      header: "User Name",
      path: "username",
    },
    {
      header: "User email",
      path: "email",
    },
    {
      header: "Role",
      path: "role",
    }
  ]

  export const grievanceColumnsVisitor = [
    {
      header: "Establishment",
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
      header: "Details",
      path: "grievance_details"
    },
    {
      header: "Date Visited",
      path: "visit_at",
      type: "datetime"
    },
    { 
      header: "Status", 
      path: "status" 
    }
  ]
  export const grievanceColumnsMember = [
    {
      header: "Grievance ID",
      path: "grievance_id"
    },
    {
      header: "Establishment",
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
      header: "Details",
      path: "grievance_details"
    },
    {
      header: "Date Visited",
      path: "visit_at",
      type: "datetime"
    },
    { 
      header: "Status", 
      path: "status" 
    }
  ]