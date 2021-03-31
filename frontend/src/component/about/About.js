import React from 'react';
import { useSelector } from 'react-redux';
import BottomNavDialog from '../dialog/BottomNavDialog';
import getDialog from '../util/dialog';
import './About.css';

const About = () => {
  const ui = useSelector((state) => state.ui);
  const { toggleBottomNav, element, title, icon } = ui;
  return (
    <>
      <div className="main">
        <div className="container">
          <h1 className="title">About us</h1>
          <div className="content__container">
            <div className="excutive__container">
              <div className="exc__card">
                <div className="exc__invisible"></div>

                <div className="exc__avatar">
                  <img src="/ceo.jpg" alt="" />
                </div>
                <div className="exc__body">
                  <h2>Chigozie Ugwuede</h2>
                  <h3>CEO Orchland Ltd</h3>
                  <ul className="social__media">
                    <li>
                      <a
                        href="https://facebook.com/calist23"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/barcafan_067"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram/gozie_rep"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-instagram-square"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:gozieugwuede@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="exc__card">
                <div className="exc__invisible"></div>

                <div className="exc__avatar">
                  <img src="/ceo.jpg" alt="" />
                </div>
                <div className="exc__body">
                  <h2>Chigozie Ugwuede</h2>
                  <h3>HR manager Orchland Ltd</h3>
                  <ul className="social__media">
                    <li>
                      <a
                        href="https://facebook.com/calist23"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/barcafan_067"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram/gozie_rep"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-instagram-square"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:gozieugwuede@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="exc__card">
                <div className="exc__invisible"></div>
                <div className="exc__avatar">
                  <img src="/ceo.jpg" alt="" />
                </div>
                <div className="exc__body">
                  <h2>Chigozie Ugwuede</h2>
                  <h3>Marketing manager Orchland Ltd</h3>
                  <ul className="social__media">
                    <li>
                      <a
                        href="https://facebook.com/calist23"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/barcafan_067"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram/gozie_rep"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-instagram-square"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:gozieugwuede@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="about__container">
              <h2>Who We Are?</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Pariatur eius voluptates veritatis ab sapiente et distinctio
                perspiciatis suscipit cumque nostrum quasi obcaecati vel
                delectus aliquam quo debitis, ducimus culpa quos. Animi illum
                dolor saepe et eos totam sed. Voluptate doloremque laboriosam
                sint culpa itaque dolor incidunt labore nostrum quasi inventore
                ipsa magnam natus cum fugit eaque suscipit quam aspernatur eum
                placeat est deserunt, ipsam odio molestiae voluptates.
                Explicabo, provident culpa animi corrupti illo repellat,
                assumenda reprehenderit reiciendis, maiores nostrum consequuntur
                vitae omnis quisquam quasi quibusdam iure ut amet expedita
                cupiditate incidunt labore qui voluptatibus facere? Molestias
                quidem rem magnam debitis?
              </p>
              <h2>Our Vision</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Pariatur eius voluptates veritatis ab sapiente et distinctio
                perspiciatis suscipit cumque nostrum quasi obcaecati vel
                delectus aliquam quo debitis, ducimus culpa quos. Animi illum
                dolor saepe et eos totam sed. Voluptate doloremque laboriosam
                sint culpa itaque dolor incidunt labore nostrum quasi inventore
                ipsa magnam natus cum fugit eaque suscipit quam aspernatur eum
                placeat est deserunt, ipsam odio molestiae voluptates.
                Explicabo, provident culpa animi corrupti illo repellat,
                assumenda reprehenderit reiciendis, maiores nostrum consequuntur
                vitae omnis quisquam quasi quibusdam iure ut amet expedita
                cupiditate incidunt labore qui voluptatibus facere? Molestias
                quidem rem magnam debitis?
              </p>
              <h2>Our Target</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Pariatur eius voluptates veritatis ab sapiente et distinctio
                perspiciatis suscipit cumque nostrum quasi obcaecati vel
                delectus aliquam quo debitis, ducimus culpa quos. Animi illum
                dolor saepe et eos totam sed. Voluptate doloremque laboriosam
                sint culpa itaque dolor incidunt labore nostrum quasi inventore
                ipsa magnam natus cum fugit eaque suscipit quam aspernatur eum
                placeat est deserunt, ipsam odio molestiae voluptates.
                Explicabo, provident culpa animi corrupti illo repellat,
                assumenda reprehenderit reiciendis, maiores nostrum consequuntur
                vitae omnis quisquam quasi quibusdam iure ut amet expedita
                cupiditate incidunt labore qui voluptatibus facere? Molestias
                quidem rem magnam debitis?
              </p>
              <h2>Our Experience</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Pariatur eius voluptates veritatis ab sapiente et distinctio
                perspiciatis suscipit cumque nostrum quasi obcaecati vel
                delectus aliquam quo debitis, ducimus culpa quos. Animi illum
                dolor saepe et eos totam sed. Voluptate doloremque laboriosam
                sint culpa itaque dolor incidunt labore nostrum quasi inventore
                ipsa magnam natus cum fugit eaque suscipit quam aspernatur eum
                placeat est deserunt, ipsam odio molestiae voluptates.
                Explicabo, provident culpa animi corrupti illo repellat,
                assumenda reprehenderit reiciendis, maiores nostrum consequuntur
                vitae omnis quisquam quasi quibusdam iure ut amet expedita
                cupiditate incidunt labore qui voluptatibus facere? Molestias
                quidem rem magnam debitis?
              </p>
            </div>
          </div>
        </div>
      </div>
      {toggleBottomNav && (
        <BottomNavDialog title={title} icon={icon}>
          {getDialog(element)}
        </BottomNavDialog>
      )}
    </>
  );
};

export default About;
