import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-indigo-500 ">
      <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem]">
        <footer className="footer sm:footer-horizontal  text-base-content p-10">
          <aside>
            <img
              className="w-36 md:w-[11.1rem] invert filter brightness-0"
              src="/images/logo.webp"
              alt=""
            />
            <p className="w-[222px] text-justify text-white">
              Search Tutor is Bangladesh’s most trusted and leading online
              platform for guardians, students, and tutors to hire verified
              tutors or find tuition jobs in various categories from anywhere in
              the country.
            </p>
          </aside>
          <nav className="text-white">
            <h6 className="font-semibold text-lg">Useful Links</h6>
            <Link to="/terms-condition" className="link link-hover">
              Terms and Conditions
            </Link>
            <Link to="/hire-tutor" className="link link-hover">
              Hire a Tutor
            </Link>
            <Link to="/payment-system" className="link link-hover">
              Payment System
            </Link>
          </nav>
          <nav className="text-white">
            <h6 className="font-semibold text-lg">Social Links</h6>
            <ul className="flex flex-wrap items-center gap-2 md:justify-start md:gap-4">
              <li className="transition-all duration-300 hover:-translate-y-1">
                <a
                  href="https://www.facebook.com/share/1EzcCG7TKe/"
                  target="_blank">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 320 512"
                    className="size-8 rounded-xl border border-white p-1 transition-all duration-500 ease-out hover:bg-white hover:text-primary"
                    height="1em"
                    width="1em"
                    xmlns="https://www.w3.org/2000/svg">
                    <title>Facebook</title>
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                  </svg>
                </a>
              </li>
              <li className="transition-all duration-300 hover:-translate-y-1">
                <a
                  href="https://www.facebook.com/share/1EzcCG7TKe/"
                  target="_blank">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    className="size-8 rounded-xl border border-white p-1 transition-all duration-500 ease-out hover:bg-white hover:text-primary"
                    height="1em"
                    width="1em"
                    xmlns="https://www.w3.org/2000/svg">
                    <title>Linkedin</title>
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
              </li>
              <li className="transition-all duration-300 hover:-translate-y-1">
                <a href="https://www.youtube.com/@SearchTutors" target="_blank">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 576 512"
                    className="size-8 rounded-xl border border-white p-1 transition-all duration-500 ease-out hover:bg-white hover:text-primary"
                    height="1em"
                    width="1em"
                    xmlns="https://www.w3.org/2000/svg">
                    <title>Youtube</title>
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                  </svg>
                </a>
              </li>
              <li className="transition-all duration-300 hover:-translate-y-1">
                <a
                  href="https://www.facebook.com/share/1EzcCG7TKe/"
                  target="_blank">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="size-8 rounded-xl border border-white p-1 transition-all duration-500 ease-out hover:bg-white hover:text-primary"
                    height="1em"
                    width="1em"
                    xmlns="https://www.w3.org/2000/svg">
                    <title>Instagram</title>
                    <path d="M17.3183118,0.0772036939 C18.5358869,0.132773211 19.3775594,0.311686093 20.156489,0.614412318 C20.9357539,0.917263935 21.5259307,1.30117806 22.1124276,1.88767349 C22.6988355,2.47414659 23.0827129,3.06422396 23.3856819,3.84361655 C23.688357,4.62263666 23.8672302,5.46418415 23.9227984,6.68172489 C23.9916356,8.19170553 24,8.72394829 24,11.9999742 C24,15.2760524 23.9916355,15.808302 23.9227954,17.3182896 C23.8672306,18.5358038 23.6883589,19.3773584 23.3855877,20.1566258 C23.0826716,20.9358162 22.6987642,21.5259396 22.1124276,22.1122749 C21.5259871,22.6987804 20.9357958,23.0827198 20.1563742,23.3856323 C19.3772192,23.6883583 18.5357324,23.8672318 17.3183209,23.9227442 C15.8086874,23.9916325 15.2765626,24 12,24 C8.72343739,24 8.19131258,23.9916325 6.68172382,23.9227463 C5.46426077,23.8672314 4.62270711,23.6883498 3.84342369,23.3855738 C3.0641689,23.0827004 2.47399369,22.6987612 1.88762592,22.1123283 C1.30117312,21.525877 0.91721975,20.9357071 0.614318116,20.1563835 C0.311643016,19.3773633 0.132769821,18.5358159 0.0772038909,17.3183251 C0.0083529426,15.8092887 0,15.2774634 0,11.9999742 C0,8.7225328 0.00835296697,8.19071076 0.0772047368,6.68165632 C0.132769821,5.46418415 0.311643016,4.62263666 0.614362729,3.84350174 C0.91719061,3.06430165 1.30113536,2.4741608 1.88757245,1.88772514 C2.47399369,1.30123879 3.0641689,0.917299613 3.84345255,0.614414972 C4.62236201,0.311696581 5.46409415,0.132773979 6.68163888,0.0772035898 C8.19074867,0.00835221992 8.72252573,0 12,0 C15.2774788,0 15.8092594,0.00835235053 17.3183118,0.0772036939 Z M12,2.66666667 C8.75959504,2.66666667 8.26400713,2.67445049 6.80319929,2.74109814 C5.87614637,2.78341009 5.31952221,2.90172878 4.80947575,3.09995521 C4.37397765,3.26922052 4.09725505,3.44924273 3.77324172,3.77329203 C3.44916209,4.09737087 3.26913181,4.37408574 3.09996253,4.80937168 C2.90169965,5.31965737 2.78340891,5.87618164 2.74109927,6.80321713 C2.67445122,8.26397158 2.66666667,8.75960374 2.66666667,11.9999742 C2.66666667,15.2403924 2.67445121,15.7360281 2.74109842,17.1967643 C2.78340891,18.1238184 2.90169965,18.6803426 3.09990404,19.1904778 C3.26914133,19.6259017 3.44919889,19.9026659 3.77329519,20.2267614 C4.09725505,20.5507573 4.37397765,20.7307795 4.80932525,20.8999863 C5.31971515,21.0982887 5.87621193,21.2165784 6.80323907,21.2588497 C8.26460439,21.3255353 8.76051223,21.3333333 12,21.3333333 C15.2394878,21.3333333 15.7353956,21.3255353 17.1968056,21.2588476 C18.123775,21.216579 18.6802056,21.0982995 19.1905083,20.9000309 C19.6260288,20.7307713 19.9027426,20.5507596 20.2267583,20.226708 C20.5507492,19.9027179 20.7308046,19.6259456 20.9000375,19.1906283 C21.0983009,18.6803412 21.2165908,18.1238118 21.2588986,17.196779 C21.3255376,15.7350718 21.3333333,15.2390126 21.3333333,11.9999742 C21.3333333,8.76098665 21.3255376,8.26493375 21.2589016,6.80323567 C21.2165911,5.87618164 21.0983004,5.31965737 20.9001178,4.80957831 C20.7308131,4.37403932 20.550774,4.09729207 20.2267583,3.77324038 C19.9027658,3.44924868 19.6260264,3.26922777 19.1905015,3.09996643 C18.6803988,2.90171817 18.1238378,2.78341062 17.1967608,2.74109868 C15.7359966,2.67445057 15.2404012,2.66666667 12,2.66666667 Z M12,18.2222222 C8.56356156,18.2222222 5.77777778,15.4364384 5.77777778,12 C5.77777778,8.56356156 8.56356156,5.77777778 12,5.77777778 C15.4364384,5.77777778 18.2222222,8.56356156 18.2222222,12 C18.2222222,15.4364384 15.4364384,18.2222222 12,18.2222222 Z M12,15.5555556 C13.9636791,15.5555556 15.5555556,13.9636791 15.5555556,12 C15.5555556,10.0363209 13.9636791,8.44444444 12,8.44444444 C10.0363209,8.44444444 8.44444444,10.0363209 8.44444444,12 C8.44444444,13.9636791 10.0363209,15.5555556 12,15.5555556 Z M18.2222222,7.11111111 C17.4858426,7.11111111 16.8888889,6.51415744 16.8888889,5.77777778 C16.8888889,5.04139811 17.4858426,4.44444444 18.2222222,4.44444444 C18.9586019,4.44444444 19.5555556,5.04139811 19.5555556,5.77777778 C19.5555556,6.51415744 18.9586019,7.11111111 18.2222222,7.11111111 Z"></path>
                  </svg>
                </a>
              </li>
              <li className="transition-all duration-300 hover:-translate-y-1">
                <a
                  href="https://www.facebook.com/share/1EzcCG7TKe/"
                  target="_blank">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    className="size-8 rounded-xl border border-white p-1 transition-all duration-500 ease-out hover:bg-white hover:text-primary"
                    height="1em"
                    width="1em"
                    xmlns="https://www.w3.org/2000/svg">
                    <title>Tiktok</title>
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
                  </svg>
                </a>
              </li>
              <li className="transition-all duration-300 hover:-translate-y-1">
                <a href="https://wa.me/8801940261863" target="_blank">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="size-8 rounded-xl border border-white p-1 transition-all duration-500 ease-out hover:bg-white hover:text-primary"
                    height="1em"
                    width="1em"
                    xmlns="https://www.w3.org/2000/svg">
                    <title>Whatsapp</title>
                    <path
                      fillRule="evenodd"
                      d="M414.73 97.1A222.14 222.14 0 0 0 256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0 0 29.78 111L32 480l118.25-30.87a223.63 223.63 0 0 0 106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 0 0 414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 0 1-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0 1 71.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 0 1 185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 0 0-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0 0 31.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z"></path>
                  </svg>
                </a>
              </li>
              <li className="transition-all duration-300 hover:-translate-y-1">
                <a
                  href="https://www.facebook.com/share/1EzcCG7TKe/"
                  target="_blank">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="size-8 rounded-xl border border-white p-1 transition-all duration-500 ease-out hover:bg-white hover:text-primary"
                    height="1em"
                    width="1em"
                    xmlns="https://www.w3.org/2000/svg">
                    <title>Twitter</title>
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                  </svg>
                </a>
              </li>
            </ul>
            <h2 className="text-xl font-bold text-white md:text-left lg:text-justify">
              Join Our Facebook Community
            </h2>
            <div className="mt-2 flex items-center gap-3  md:flex-row md:items-center">
              <a
                href="https://www.facebook.com/share/g/1CsJLDz75R/"
                target="_blank">
                <img
                  alt="Home Tutors &amp; Tuitions"
                  loading="lazy"
                  width="122"
                  height="50"
                  decoding="async"
                  data-nimg="1"
                  src="https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/icon/Tutor_Community.svg"
                  className="text-transparent"
                />
              </a>
              <a
                href="https://www.facebook.com/share/g/12LNfQSHmif/?mibextid=A7sQZp"
                target="_blank">
                <img
                  alt="Home Tutors &amp; Tuitions"
                  loading="lazy"
                  width="122"
                  height="50"
                  decoding="async"
                  data-nimg="1"
                  src="https://caretutor-space-file.nyc3.cdn.digitaloceanspaces.com/assets/img/icon/Guardians_Community.svg"
                  className="text-transparent"
                />
              </a>
            </div>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
