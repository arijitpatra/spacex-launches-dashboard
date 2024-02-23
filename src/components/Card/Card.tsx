import styles from "./Card.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Card = ({ data, innerRef = null }: any) => {
  // TODO: instead of whole data in props take things needed here as props including labels to make it more reusable

  return (
    <section ref={innerRef} className={`${styles.card}`}>
      <div>
        <img
          loading="lazy"
          src={data.links.patch.small}
          width={100}
          height={100}
          aria-label="rocket photo"
        />
      </div>
      <div className={`${styles.info}`}>
        <div>
          <div className={`${styles.label}`}>Flight Number</div>
          <div>{data.flight_number}</div>
        </div>
        <div>
          <div className={`${styles.label}`}>Mission</div>
          <div>{data.name}</div>
        </div>
      </div>
      <div className={`${styles.info}`}>
        <div>
          <div className={`${styles.label}`}>Rocket</div>
          <div>{data.rocket.name}</div>
        </div>
        <div>
          <div className={`${styles.label}`}>Status</div>
          <div
            className={`${
              data.upcoming
                ? ""
                : data.success
                ? styles.successful
                : styles.failed
            }`}
          >
            {data.upcoming ? "Upcoming" : data.success ? "Success" : "Failed"}
          </div>
        </div>
      </div>
      <div className={`${styles.info}`}>
        <div>
          <div className={`${styles.label}`}>Launchpad</div>{" "}
          <div>{data.launchpad.name}</div>
        </div>
        <div>
          <div className={`${styles.label}`}>Date & Time (UTC)</div>
          <div>
            {new Date(data.date_utc).toLocaleString([], {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
        </div>
      </div>
      <div className={`${styles.info}`}>
        <a
          className={`${styles.links}`}
          href={data.links.wikipedia}
          target="_blank"
        >
          Wikipedia
        </a>
        <a
          className={`${styles.links}`}
          href={data.links.webcast}
          target="_blank"
        >
          Webcast
        </a>
      </div>
    </section>
  );
};

export default Card;
