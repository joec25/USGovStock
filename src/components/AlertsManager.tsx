"use client";

import React, { useState } from "react";
import { Bell, BellOff, Edit, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface AlertProps {
  id: string;
  politician: string;
  notificationType: "email" | "push" | "both";
  active: boolean;
  minTradeAmount?: number;
}

export default function AlertsManager() {
  const [alerts, setAlerts] = useState<AlertProps[]>([
    {
      id: "1",
      politician: "Nancy Pelosi",
      notificationType: "email",
      active: true,
      minTradeAmount: 1000,
    },
    {
      id: "2",
      politician: "Mitch McConnell",
      notificationType: "push",
      active: false,
    },
    {
      id: "3",
      politician: "Dan Crenshaw",
      notificationType: "both",
      active: true,
      minTradeAmount: 5000,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [editingAlert, setEditingAlert] = useState<AlertProps | null>(null);
  const [newAlert, setNewAlert] = useState<Partial<AlertProps>>({
    politician: "",
    notificationType: "email",
    active: true,
  });

  const handleCreateAlert = () => {
    if (!newAlert.politician) return;

    const alert: AlertProps = {
      id: Date.now().toString(),
      politician: newAlert.politician,
      notificationType: newAlert.notificationType as "email" | "push" | "both",
      active: newAlert.active || true,
      minTradeAmount: newAlert.minTradeAmount,
    };

    setAlerts([...alerts, alert]);
    setNewAlert({
      politician: "",
      notificationType: "email",
      active: true,
    });
    setIsDialogOpen(false);
  };

  const handleUpdateAlert = () => {
    if (!editingAlert) return;

    setAlerts(
      alerts.map((alert) =>
        alert.id === editingAlert.id ? editingAlert : alert,
      ),
    );

    setEditingAlert(null);
    setIsDialogOpen(false);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, active: !alert.active } : alert,
      ),
    );
  };

  const politicians = [
    "Nancy Pelosi",
    "Mitch McConnell",
    "Dan Crenshaw",
    "Alexandria Ocasio-Cortez",
    "Ted Cruz",
    "Elizabeth Warren",
    "Bernie Sanders",
    "Josh Hawley",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Alerts Manager</h2>
          <p className="text-muted-foreground">
            Get notified when politicians make new trades
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Bell className="mr-2 h-4 w-4" />
              Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAlert ? "Edit Alert" : "Create New Alert"}
              </DialogTitle>
              <DialogDescription>
                {editingAlert
                  ? "Update your alert settings for this politician."
                  : "Set up notifications for trades by a specific politician."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="politician">Politician</Label>
                <Select
                  value={editingAlert?.politician || newAlert.politician}
                  onValueChange={(value) => {
                    if (editingAlert) {
                      setEditingAlert({ ...editingAlert, politician: value });
                    } else {
                      setNewAlert({ ...newAlert, politician: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a politician" />
                  </SelectTrigger>
                  <SelectContent>
                    {politicians.map((politician) => (
                      <SelectItem key={politician} value={politician}>
                        {politician}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notificationType">Notification Type</Label>
                <Select
                  value={
                    editingAlert?.notificationType || newAlert.notificationType
                  }
                  onValueChange={(value: "email" | "push" | "both") => {
                    if (editingAlert) {
                      setEditingAlert({
                        ...editingAlert,
                        notificationType: value,
                      });
                    } else {
                      setNewAlert({ ...newAlert, notificationType: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minTradeAmount">Minimum Trade Amount ($)</Label>
                <Input
                  id="minTradeAmount"
                  type="number"
                  placeholder="Any amount"
                  value={
                    editingAlert?.minTradeAmount ||
                    newAlert.minTradeAmount ||
                    ""
                  }
                  onChange={(e) => {
                    const value = e.target.value
                      ? parseInt(e.target.value)
                      : undefined;
                    if (editingAlert) {
                      setEditingAlert({
                        ...editingAlert,
                        minTradeAmount: value,
                      });
                    } else {
                      setNewAlert({ ...newAlert, minTradeAmount: value });
                    }
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={editingAlert?.active ?? newAlert.active}
                  onCheckedChange={(checked) => {
                    if (editingAlert) {
                      setEditingAlert({ ...editingAlert, active: checked });
                    } else {
                      setNewAlert({ ...newAlert, active: checked });
                    }
                  }}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setEditingAlert(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={editingAlert ? handleUpdateAlert : handleCreateAlert}
              >
                {editingAlert ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        {alerts.length > 0 ? (
          <div className="grid gap-4">
            {alerts.map((alert) => (
              <Card
                key={alert.id}
                className={`${!alert.active ? "opacity-70" : ""}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {alert.politician}
                      </CardTitle>
                      <CardDescription>
                        {alert.notificationType === "email" &&
                          "Email notifications"}
                        {alert.notificationType === "push" &&
                          "Push notifications"}
                        {alert.notificationType === "both" &&
                          "Email & Push notifications"}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {alert.active ? (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                        >
                          Inactive
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm">
                    {alert.minTradeAmount ? (
                      <p>
                        Minimum trade amount: $
                        {alert.minTradeAmount.toLocaleString()}
                      </p>
                    ) : (
                      <p>All trade amounts</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleActive(alert.id)}
                  >
                    {alert.active ? (
                      <>
                        <BellOff className="mr-2 h-4 w-4" />
                        Disable
                      </>
                    ) : (
                      <>
                        <Bell className="mr-2 h-4 w-4" />
                        Enable
                      </>
                    )}
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingAlert(alert);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDeleteAlert(alert.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] border rounded-lg p-6">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No alerts set up</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create alerts to get notified when politicians make new trades
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Create your first alert
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
