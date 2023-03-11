package helper

import (
	gomail "gopkg.in/gomail.v2"
)

func SendMail(email, link string) {
	msg := gomail.NewMessage()
	msg.SetHeader("From", "nutthanon.thon@kmutt.ac.th")
	msg.SetHeader("To", email)
	msg.SetHeader("Subject", "no-reply")

	msg.SetBody("text/html", EmailGenerate(link))

	n := gomail.NewDialer("smtp.gmail.com", 587, "nutthanon.tho@gmail.com", GetENV("GOOGLE_APP_PASSWORD"))

	if err := n.DialAndSend(msg); err != nil {
		panic(err)
	}
}
