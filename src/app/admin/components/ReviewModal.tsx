"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ReviewModal({ review }: any) {

  const router = useRouter()

  const [showBox, setShowBox] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  // DELETE REVIEW
  const handleDelete = async (reviewId: string) => {

    const confirmDelete = confirm("Are you sure you want to delete this review?")
    if (!confirmDelete) return

    try {

      const res = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "DELETE"
      })

      if (!res.ok) {
        const error = await res.json()
        alert(error.error || "Failed to delete review")
        return
      }

      alert("Review deleted successfully")

      router.refresh()

    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  // ADMIN RESPONSE
  const handleRespond = async () => {

    if (!message.trim()) {
      alert("Response cannot be empty")
      return
    }

    setLoading(true)

    try {

      const res = await fetch("/api/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reviewId: review.id,
          message
        })
      })

      if (!res.ok) {
        const error = await res.json()
        alert(error.error || "Failed to send response")
        return
      }

      setMessage("")
      setShowBox(false)

      router.refresh()

    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="border rounded-lg p-4 shadow-sm bg-white mb-4">

      {/* REVIEW TEXT */}
      <p className="font-medium text-lg">{review.reviewText}</p>

      {/* RATING */}
      <p className="text-sm text-gray-600 mt-1">
        Rating: ⭐ {review.rating} / 5
      </p>

      {/* DATE */}
      <p className="text-xs text-gray-500">
        {new Date(review.createdAt).toLocaleString()}
      </p>

      {/* SENTIMENT */}
      <p className="text-sm mt-1">
        Sentiment: {review.sentiment}
      </p>


      {/* ADMIN RESPONSE DISPLAY */}
      {review.responses?.length > 0 && (

        <div className="mt-3 p-3 bg-gray-100 rounded">

          <p className="text-sm font-semibold">
            Admin Response
          </p>
          

          <p className="text-sm mt-1">
            {review.responses[0].message}
          </p>

        </div>

      )}

      <div className="flex gap-3 mt-4">

        {review.responses?.length === 0 && (

          <button
            onClick={() => setShowBox(!showBox)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Respond
          </button>

        )}

        {/* DELETE BUTTON */}
        <button
          onClick={()=>handleDelete(review.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>

      </div>


      {/* RESPONSE TEXTAREA */}
      {showBox && (

        <div className="mt-3">

          <textarea
            className="w-full border rounded p-2"
            rows={3}
            placeholder="Write your response..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleRespond}
            disabled={loading}
            className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            {loading ? "Submitting..." : "Submit Response"}
          </button>

        </div>

      )}

    </div>

  )
}