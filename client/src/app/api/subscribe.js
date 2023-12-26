export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle subscription logic here
    // You can save the subscription details to a database or process it as needed
    res.status(200).json({ message: 'Subscription successful' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
