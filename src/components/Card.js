import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import img from '../assets/img/20220825.jpg';

const Card = () => {
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">I Have A Home Now~</h4>
              <h6 className="text-muted card-subtitle mb-2">August 25th, 2022 Thu&nbsp;<FontAwesomeIcon icon="sun"/></h6>
              <p className="card-text">
                {`Hello everyone, 

                My name is Panpan 盼盼, I am officially adopted by my mommy and daddy today. I love being held by them and nibbling on their fingers 😊. They were looking for my friend Tim who is black & white, but won them over hehe 😏, that's why I am named after a panda 🐼.

                I look forward to spending a good life with them 😎 ~ Woof look at our picture on Instagram too pweeez~

                Yours,
                Panpan 盼盼 Garcia-Wang 🐾`}
              </p>
              <div className="text-center p-4 p-lg-5">
                <a className="btn btn-primary fs-5 me-2 py-2 px-4" role="button" data-bs-toggle="tooltip" data-bss-tooltip="" data-bss-hover-animate="bounce" title="Follow me pweeez" href="https://www.instagram.com/panpan_the_bun_/">My Instagram&nbsp;<FontAwesomeIcon icon={['fab', 'instagram']} /></a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Card;
