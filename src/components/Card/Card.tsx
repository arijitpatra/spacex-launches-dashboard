import styles from "./Card.module.scss";

interface CardProps {
  imageSrc: string;
  flightNumber: number;
  missionName: string;
  rocketName: string;
  status: Status;
  launchpadName: string;
  dateTimeUtc: string;
  wikipediaLink: string;
  webcastLink: string;
  innerRef: React.Ref<HTMLElement> | null;
}

const Card = ({
  imageSrc,
  flightNumber,
  missionName,
  rocketName,
  status,
  launchpadName,
  dateTimeUtc,
  wikipediaLink,
  webcastLink,
  innerRef = null,
}: CardProps) => {
  return (
    <section ref={innerRef} className={`${styles.card}`}>
      <div>
        <img
          loading="lazy"
          src={imageSrc}
          width={100}
          height={100}
          aria-label="rocket photo"
        />
      </div>

      <div className={`${styles.info}`}>
        <div>
          <div className={`${styles.label}`}>Flight Number</div>
          <div>{flightNumber}</div>
        </div>
        <div>
          <div className={`${styles.label}`}>Mission</div>
          <div>{missionName}</div>
        </div>
      </div>

      <div className={`${styles.info}`}>
        <div>
          <div className={`${styles.label}`}>Rocket</div>
          <div>{rocketName}</div>
        </div>
        <div>
          <div className={`${styles.label}`}>Status</div>
          <div
            className={`${
              status === "Upcoming"
                ? ""
                : status === "Success"
                ? styles.success
                : styles.failed
            }`}
          >
            {status}
          </div>
        </div>
      </div>

      <div className={`${styles.info}`}>
        <div>
          <div className={`${styles.label}`}>Launchpad</div>{" "}
          <div>{launchpadName}</div>
        </div>
        <div>
          <div className={`${styles.label}`}>Date & Time (UTC)</div>
          <div>{dateTimeUtc}</div>
        </div>
      </div>

      <div className={`${styles.info}`}>
        <a className={`${styles.links}`} href={wikipediaLink} target="_blank">
          Wikipedia
        </a>
        <a
          className={`${styles.links}`}
          href={webcastLink}
          target="_blank"
          data-linktype="video"
        >
          Webcast
        </a>
      </div>
    </section>
  );
};

export default Card;
