'use client'

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function PartnerTabs() {
    const [mounted, setMounted] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">Overview content here</TabsContent>
            <TabsContent value="documents">Documents content here</TabsContent>
            <TabsContent value="notes">Notes content here</TabsContent>
        </Tabs>
    )
}
