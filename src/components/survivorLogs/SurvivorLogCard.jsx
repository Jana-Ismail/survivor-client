import "./Survivors.css"

export const SurvivorLogCard = ({ survivorLog }) => {
    const { survivor } = survivorLog
    const placeholderImage = ""
    // const placeholderImage = "https://place-hold.it/200x250/666/fff/000.jpg&text=No Image&fontsize=16"

    return (
        <div className="survivor-card">
            <div className="survivor-image-container">
                <img 
                    src={survivor.img_url || placeholderImage} 
                    alt={`${survivor.first_name} ${survivor.last_name}`}
                    className="survivor-image"
                />
                {survivorLog.is_active && <div className="status-badge active">Active</div>}
                {survivorLog.is_juror && <div className="status-badge jury">Jury</div>}
            </div>
            <div className="survivor-info">
                <h3 className="survivor-name">
                    {survivor.first_name} {survivor.last_name}
                </h3>
                <p className="survivor-age">Age: {survivor.age}</p>
            </div>
        </div>
    )
}