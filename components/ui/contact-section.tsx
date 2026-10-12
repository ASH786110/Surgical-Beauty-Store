import React, { useState } from "react"
import { Mail, Send, CheckCircle2, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 800)
  }

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Contact Details & Info */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-foreground">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span>Let's talk</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Ready to start your next big project?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Have an idea, need engineering muscle, or looking to redesign your brand? Drop us a note and we'll get back to you within 24 hours.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Email us directly</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">hello@nexusstudio.design</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Phone & WhatsApp</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">+1 (555) 349-2041</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Studio Location</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">548 Market St, Suite 392, San Francisco, CA</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Response Time</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">Guaranteed reply under 24 business hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-lg">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">Message Sent Successfully!</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                  Thank you for reaching out, <span className="font-semibold text-foreground">{formData.name}</span>. Our lead strategist will get in touch with you shortly.
                </p>
                <Button
                  className="mt-6"
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ name: "", email: "", message: "" })
                  }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-card-foreground">Send a message</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fill out the form below and we will respond promptly.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="Jane Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your project, timeline, and goals..."
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 shadow-sm font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending message..."
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
