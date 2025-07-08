import { getContactPage } from '@/lib/cosmic'
import ContactForm from '@/components/ContactForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Cosmic Store',
  description: 'Get in touch with our team for questions, support, or feedback.',
}

export default async function ContactPage() {
  const contactPage = await getContactPage()

  if (!contactPage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We'd love to hear from you! Please fill out the form below and we'll get back to you soon.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const { metadata } = contactPage

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {metadata.page_title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {metadata.page_description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h2>
                <div 
                  className="prose prose-gray dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: metadata.contact_info }}
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm
                formTitle={metadata.form_title}
                formDescription={metadata.form_description}
                successMessage={metadata.success_message}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}