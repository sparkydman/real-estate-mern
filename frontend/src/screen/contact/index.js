import React from 'react';
import { useSelector } from 'react-redux';
import BottomNavDialog from '../../component/dialog/BottomNavDialog';
import getDialog from '../../component/util/dialog';
import './index.css';

const ContactUs = () => {
  const ui = useSelector((state) => state.ui);
  const { toggleBottomNav, element, title, icon } = ui;
  return (
    <div className="contact">
      <div className="container">
        <h1 className="title">About us</h1>
        <div className="contact__container">
          {/* branch offices */}
          <div className="branch__offices">
            <div className="carousel__track">
              <div className="carousel__card">
                <div className="card__img">
                  <img src="/office1.jpg" alt="office one" />
                </div>
                <div className="card__body">
                  <h3>Head office</h3>
                  <address>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </address>
                </div>
              </div>
              <div className="carousel__card">
                <div className="card__img">
                  <img src="/office2.jpg" alt="office one" />
                </div>
                <div className="card__body">
                  <h3>Head office</h3>
                  <address>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </address>
                </div>
              </div>
              <div className="carousel__card">
                <div className="card__img">
                  <img src="/office3.jpg" alt="office one" />
                </div>
                <div className="card__body">
                  <h3>Head office</h3>
                  <address>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </address>
                </div>
              </div>
              <div className="carousel__card">
                <div className="card__img">
                  <img src="/office4.jpg" alt="office one" />
                </div>
                <div className="card__body">
                  <h3>Head office</h3>
                  <address>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* contact form */}
          <div className="form__container">
            <h2>We will response to your messages asap!</h2>
            <form className="form">
              <div className="form__control_contact">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form__control_contact">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form__control_contact">
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" rows="6"></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      {toggleBottomNav && (
        <BottomNavDialog title={title} icon={icon}>
          {getDialog(element)}
        </BottomNavDialog>
      )}
    </div>
  );
};

export default ContactUs;
