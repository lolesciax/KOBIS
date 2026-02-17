import React from 'react';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Geoffrey Yann',
      role: 'Food Critic',
      comment: 'The sisig are absolutely legendary! Best I\'ve had in years.',
      rating: 5,
      image: '👩'
    },
    {
      id: 2,
      name: 'Arthur Videz',
      role: 'Regular Customer',
      comment: 'Perfect blend of flavors. Their liempo melts in your mouth!',
      rating: 5,
      image: '👨'
    },
    {
      id: 3,
      name: 'Eveyn Pleim',
      role: 'First-time Visitor',
      comment: 'Amazing atmosphere and even better food. Will definitely return!',
      rating: 5,
      image: '👩‍🦰'
    }
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="section-subtitle">Don't just take our word for it</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  <span>{testimonial.image}</span>
                </div>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
                <div className="testimonial-rating">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
              </div>
              <p className="testimonial-comment">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;