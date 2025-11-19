"use client"

import Header from "@/components/header"


function ComposeHeader() {
  return (
    <Header 
    appendClassName="pt-16 bg-amber-600 pb-20" 
    tittle="By Category" 
    back={{historyBack: true}}
    more={{display: false}}
    thumbsUp={{display: false}}
    />
  )
}

export default ComposeHeader