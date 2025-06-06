"use client"

import type React from "react"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Partner Management Admin",
    siteDescription: "Admin panel for partner management",
    supportEmail: "support@example.com",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    partnerApprovalNotifications: true,
    partnerRejectionNotifications: true,
    systemNotifications: false,
  })

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the settings to the server
    console.log("Saving general settings:", generalSettings)
    alert("General settings saved successfully!")
  }

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the settings to the server
    console.log("Saving notification settings:", notificationSettings)
    alert("Notification settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* General Settings */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>

          <form onSubmit={handleGeneralSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Site Name</span>
              </label>
              <Input
                type="text"
                name="siteName"
                value={generalSettings.siteName}
                onChange={handleGeneralSettingsChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Site Description</span>
              </label>
              <Input
                type="text"
                name="siteDescription"
                value={generalSettings.siteDescription}
                onChange={handleGeneralSettingsChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Support Email</span>
              </label>
              <Input
                type="email"
                name="supportEmail"
                value={generalSettings.supportEmail}
                onChange={handleGeneralSettingsChange}
              />
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </form>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>

          <form onSubmit={handleNotificationSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationSettingsChange}
                />
                <span className="label-text">Email Notifications</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="partnerApprovalNotifications"
                  checked={notificationSettings.partnerApprovalNotifications}
                  onChange={handleNotificationSettingsChange}
                />
                <span className="label-text">Partner Approval Notifications</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="partnerRejectionNotifications"
                  checked={notificationSettings.partnerRejectionNotifications}
                  onChange={handleNotificationSettingsChange}
                />
                <span className="label-text">Partner Rejection Notifications</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="systemNotifications"
                  checked={notificationSettings.systemNotifications}
                  onChange={handleNotificationSettingsChange}
                />
                <span className="label-text">System Notifications</span>
              </label>
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" />
              Save Notification Settings
            </Button>
          </form>
        </div>
      </div>

      {/* Account Settings */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

          <div className="space-y-4">
            <Button variant="outline" className="w-full sm:w-auto">
              Change Password
            </Button>

            <Button variant="outline" className="w-full sm:w-auto">
              Update Profile
            </Button>

            <Button variant="outline" className="w-full sm:w-auto text-destructive hover:bg-destructive/10">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

